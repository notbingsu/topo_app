# Setup
Clone this repository to your local machine to access the application, report and relevant files.

Set up a virtual environment and install the required packages using the following commands:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

First run the Flask server after accessing the application directory to set up API endpoints and preload data to be used by the application:

```bash
cd topo_app
python app.py
```
Then run the application locally using the following command:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000/`.

Refer to the [Report](Report.md) for more information on the technical assessment, data exploration, data ingestion, using the data visualization and API implementation.