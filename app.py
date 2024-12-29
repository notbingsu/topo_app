from flask import Flask, request, jsonify   
from flask_cors import CORS
from scripts.data_ingestion import DataIngestion, DataProcessor, DataSaver

import json
import requests
import os

app = Flask(__name__)
CORS(app)

file_type_origins = {
    "json": "topo_app/public/datasets/dataset1.json",
    "csv": "topo_app/public/datasets/dataset2.csv",
    "pdf": "topo_app/public/datasets/dataset3.pdf",
    "pptx": "topo_app/public/datasets/dataset4.pptx"
}

file_type_to_file = {
    "json": "topo_app/public/datasets/dataset1.json",
    "csv": "topo_app/public/datasets/dataset2.json",
    "pdf": "topo_app/public/datasets/dataset3.json",
    "pptx": "topo_app/public/datasets/dataset4.json"
}

@app.route('/fetch-all-data', methods=['GET'])
def fetch_all_data():
    data = {}
    for file_type, file_path in file_type_to_file.items():
        with open(file_path, 'r') as f:
            data[file_type] = json.load(f)
    return jsonify(data)

@app.route('/fetch-data', methods=['GET'])
def fetch_data():
    file_type = request.args.get('file_type')
    file_path = file_type_to_file.get(file_type)
    if file_path:
        with open(file_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify({"error": "Invalid file type"})

def preload_data():
    ingestion = DataIngestion(
        file_type_origins['json'],
        file_type_origins['csv'],
        file_type_origins['pdf'],
        file_type_origins['pptx']
    )
    # Ensure the datasets directory exists
    os.makedirs('topo_app/public/datasets', exist_ok=True)

    # Create files if they do not exist
    for file_path in file_type_to_file.values():
        if not os.path.exists(file_path):
            with open(file_path, 'w') as f:
                json.dump({}, f)
    # Process JSON
    json_df = ingestion.import_json()
    companies_df, companies_revenue_df, companies_profit_margin_df, employees_df = DataProcessor.process_json(json_df)

    # Process CSV
    csv_df = ingestion.import_csv()
    DataSaver.save_as_json(csv_df, 'topo_app/public/datasets/dataset2.json')

    # Process PDF
    pdf_table_df = ingestion.import_pdf()
    DataSaver.save_as_json(pdf_table_df, 'topo_app/public/datasets/dataset3.json')

    # Process PPTX
    text_data = ingestion.import_pptx()
    parsed_data = DataProcessor.parse_text_to_json(text_data)
    DataSaver.save_text_as_json(parsed_data, 'topo_app/public/datasets/dataset4.json')
    

if __name__ == '__main__':
    preload_data()
    app.run(debug=True, port=8000)
