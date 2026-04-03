import os
from abc import ABC, abstractmethod

class BaseConverter(ABC):
    def __init__(self, output_dir):
        self.output_dir = output_dir

    @abstractmethod
    def convert(self, input_path, target_format):
        """
        Abstract method to be implemented by all converters.
        Returns the filename of the converted file.
        """
        pass

    def get_output_path(self, output_filename):
        return os.path.join(self.output_dir, output_filename)
