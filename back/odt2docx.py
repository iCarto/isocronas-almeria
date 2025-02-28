from pathlib import Path

import execute


# https://stackoverflow.com/a/30465397


def call(infile: list[Path], outdir):
    command = [
        "libreoffice",
        "--headless",
        "--invisible",
        "--nocrashreport",
        "--nodefault",
        "--nologo",
        "--nofirststartwizard",
        "--norestore",
        "--convert-to",
        "docx",
        *infile,
        "--outdir",
        outdir,
    ]
    # print(" ".join(str(i) for i in command))
    # breakpoint()

    errors = execute.execute_quitely(command, env={"HOME": "/var/tmp"})
    if errors[0] != 0:
        raise Exception(errors)
