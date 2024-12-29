import os
import pytest
from app import file_type_origins, file_type_to_file

base_dir = "/Users/bingsu/Desktop/work/projects/topo_assignment"

@pytest.mark.parametrize("file_type", file_type_origins.keys())
def test_file_exists(file_type):
    """
    Test if the given file path exists for each file type.
    """
    origin_file_path = file_type_origins[file_type]
    parsed_file_path = file_type_to_file[file_type]
    
    # Full path for origin and parsed files
    full_origin_path = os.path.join(base_dir, origin_file_path)
    full_parsed_path = os.path.join(base_dir, parsed_file_path)

    # Check if the origin file exists
    assert os.path.exists(full_origin_path), f"Origin file {full_origin_path} does not exist"

    # Check if the parsed JSON file exists
    assert os.path.exists(full_parsed_path), f"Parsed file {full_parsed_path} does not exist"
