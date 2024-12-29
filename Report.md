## Introduction 
This report explains the processes and features of technical assessment for topo

## Data exploration
There are 4 different file types for data ingestions
- .json
- .csv
- .pdf
- .pptx

On first observation, the pptx data may be the most complicated to ingest while json and csv are common data storage formats. The data across the 4 files also describe the financial data of FitPro which appears to be a fitness company with various locations and classes.

The objective is to simply merge all the data into a single dataset that can be retrieved in a single API call or by file type. Therefore, the data should persist as separate files but can be called together.

Refer to the [notebook](data_ingestion.ipynb) for more detailed information on the data exploration process as well as experimental visualisations.

## Data Ingestion

Original data files were first uploaded into public/datasets, where there were used for data ingestion via functions in the Flask server.

After studying the 4 different data formats, it is observed that they present different data and not the same data in different formats. 

The datasets were analysed to understand the data structure and relevant scripts were written to extract the data. The data was stored in unified JSON formats for retrieval and processing.

Dataset 1 in json contains information on companies, their employees and the company performance (revenue and profit margin by quarter).
Dataset 2 in csv contains various memberships and their details.
Dataset 3 in pdf contains unnamed revenue in sports memberships across quarters, which I determined to specifically refer to FitPro since it aligns with data from Dataset 4.
Dataset 4 was the most challenging one, with miscellaneous data on Fitpro.

## Data Visualization

Across the 4 different datasets, various different insights can be offered. 

The JSON data offers hiring information on the companies and performance. However performance data of company other than FitPro is limited as additional information for FitPro is available from the other datasets. Hiring information is also incomplete and cannot be compared chronologically as some hiring dates are missing.

The CSV data can be used to create a filterable list of memberships and details. The filters are membership type, activity and location. This will be the most interactive component of the data visualisation, allowing users to filter and visualise data depending on their preference.

The pdf and pptx data present similar data on revenue and membership sold across the quarters, where the pdf data presents a longer duration and the pptx data offers some summaries of 2023. It is important to note that the pptx data cannot be cross referred using the csv data as the csv data contains data of 2024.

The 2 main visualisations I have chosen are displaying revenue and membership information of FitPro using line graph, and displaying 2024 FitPro membership data using a donut graph.

The donut graph has various interactive elements allowing the user to first select filters, then choosing the grouping/categorization of the data, and finally choosing the values (revenue/duration) to be displayed.

## API

The following API endpoints have been implemented to retrieve the data:

#### Fetch All Data
- **Endpoint:** `/fetch-all-data`
- **Method:** `GET`
- **Description:** This endpoint fetches all the data from the different datasets and returns it as a JSON object.
- **Response:**
    ```json
    {
        "json": { ... },
        "csv": { ... },
        "pdf": { ... },
        "pptx": { ... }
    }
    ```

#### Fetch Data by File Type
- **Endpoint:** `/fetch-data`
- **Method:** `GET`
- **Description:** This endpoint fetches data based on the file type specified in the query parameter.
- **Query Parameters:**
    - `file_type` (required): The type of file to fetch data from. Possible values are `json`, `csv`, `pdf`, `pptx`.
- **Response:**
    ```json
    {
        { ... }
    }
    ```
    or
    ```json
    {
        "error": "Invalid file type"
    }
    ```

### Data Preloading

The data preloading process involves importing data from the original files, processing it, and saving it in a unified JSON format. This ensures that the data is readily available for the API endpoints to serve.

#### Steps:
1. **Import JSON Data:** The JSON data is imported and processed to extract information about companies, their employees, and company performance.
2. **Import CSV Data:** The CSV data is imported and saved as JSON.
3. **Import PDF Data:** The PDF data is imported, processed, and saved as JSON.
4. **Import PPTX Data:** The PPTX data is imported, parsed into JSON format, and saved.

The preloading process ensures that the data is structured and stored in a consistent format, making it easy to retrieve and use for visualizations and analysis in the app.

## Pytest

Implemented a pytest to check if file origins and parsed files exist, can be used to debug in the case visualisations in the app are not rendering as expected.

Simply run the following command to run the tests:
```bash
pytest
```
