#!/bin/bash

# https://virendra.dev/blog/colorize-your-shell-scripts-printing-colored-output-in-shell
# https://misc.flogisoft.com/bash/tip_colors_and_formatting
# https://www.baeldung.com/linux/terminal-output-color
# https://linuxsimply.com/bash-scripting-tutorial/input-output/output/color-output/
# https://www.shellhacks.com/bash-colors/
# https://unix.stackexchange.com/questions/92563/friendly-terminal-color-names-in-shell-scripts
# https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux

set +x

RESET='\033[0m'
FG_RED='31'

T_RED_FG=$(tput setaf 1)
T_GREEN_BG=$(tput setab 2)
T_RESET=$(tput sgr0)

function set-color() {

    case $1 in
        red) col=$'\033[1;31m' ;;
        green) col=$'\033[1;32m' ;;
        yellow) col=$'\033[1;33m' ;;
        blue) col=$'\033[1;34m' ;;
        magenta) col=$'\033[1;35m' ;;
        cyan) col=$'\033[1;36m' ;;
        *) col='' ;;
    esac

    printf "%s" "${col}"

    shift
    exec "$@"
}

function tred() {
    echo "${T_RED_FG}${T_GREEN_BG}${1}${T_RESET}"
    if [[ -n "${2:-}" ]]; then
        echo "${T_RED_FG}${T_GREEN_BG}${2}${T_RESET}"
    fi
}

function black() {
    echo -e "\033[30m $1 ${RESET}"
    if [[ -n "${2:-}" ]]; then
        echo -e "\033[30m $($2) ${RESET}"
    fi
}
function red() {
    echo -e "\033[${FG_RED}m $1 ${RESET}"
    if [[ -n "${2:-}" ]]; then
        echo -e "\033[${FG_RED}m $($2) ${RESET}"
    fi
}
function green() {
    echo -e "\033[32m $1 ${RESET}"
    if [[ -n "${2:-}" ]]; then
        echo -e "\033[32m $($2) ${RESET}"
    fi
}
function yellow() {
    echo -e "\033[33m $1 ${RESET}"
    if [[ -n "${2:-}" ]]; then
        echo -e "\033[33m $($2) ${RESET}"
    fi
}
function blue() {
    echo -e "\033[34m $1 ${RESET}"
    if [[ -n "${2:-}" ]]; then
        echo -e "\033[34m $($2) ${RESET}"
    fi
}
function purple() {
    echo -e "\033[35m $1 ${RESET} \c"
    if [[ -n "${2:-}" ]]; then
        echo -e "\033[35m $($2) ${RESET}"
    fi
}
function cyan() {
    echo -e "\033[36m $1 ${RESET}"
    if [[ -n "${2:-}" ]]; then
        echo -e "\033[36m $($2) ${RESET}"
    fi
}
function white() {

    echo -e "\033[37m $1 ${RESET}"
    if [[ -n "${2:-}" ]]; then
        echo -e "\033[33m $($2) ${RESET}"
    fi
}

# green "Green: Formating Root partition .."
# white "White: Formating Root partition .."
# pass the second parameter, will be treated as command
# yellow "color command output,print ls:" "ls"
# red "Red: System Free RAM:" "free -m"
# cyan "cyan: awesome..........end..................."
# echo -e "mix the color $(purple "Purple: this is purple, will print disk usage" "du -h") Now Yellow: $(yellow "hi Yelow") "
