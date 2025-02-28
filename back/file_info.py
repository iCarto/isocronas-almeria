from dataclasses import dataclass
from pathlib import Path


@dataclass
class FileInfo:
    path: Path

    @property
    def extension(self):
        return self.path.suffix

    @property
    def name_with_extension(self):
        return self.path.name

    @property
    def name_without_extension(self):
        return self.path.stem

    @property
    def folder_name(self):
        return self.path.parent.name

    @property
    def parent_folder_name(self):
        return self.path.parent.parent.name
