from subprocess import DEVNULL, PIPE, Popen


def execute_quitely(args, env=None):
    """Executes the command via subprocess.

    Popen without accepting input (stdin) or outputing anything (stdout, stderr)
    Returns the original exit status of the command used
    """
    # https://stackoverflow.com/questions/11269575/
    p = Popen(args, env=env, stdin=DEVNULL, stdout=DEVNULL, stderr=PIPE)  # noqa: S603
    err = p.communicate()
    # communicate() returns a tuple (stdout, stderr) that are bytes, so we need to convert this bytes literals
    # to str to avoid errors with json.dumps
    err_messages = [st.decode("utf-8") if st is not None else None for st in err]
    return (p.returncode, err_messages)
