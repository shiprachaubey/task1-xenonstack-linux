#!/bin/bash

# Define variables
VERSION="v0.1.0"
MANUAL_PATH="E:/task1"  # Adjust the path as needed

# Function to display command manual
display_manual() {
    cat << EOF
.TH INTERNCTL 1 "2023-12-18" "v0.1.0" "internsctl Manual"

.SH NAME
internsctl \- Custom Linux command for operations

.SH SYNOPSIS
.B internsctl
[\fIOPTIONS\fR] [\fIARGUMENTS\fR]

.SH DESCRIPTION
.B internsctl
is a custom Linux command designed for specific operations.

.SH OPTIONS
.TP
\fB--help\fR
Display this help message.

.TP
\fB--version\fR
Display command version.

.SH EXAMPLES
.B internsctl --help
.B internsctl --version

.SH AUTHOR
Your Name

.SH COPYRIGHT
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

.SH VERSION
$VERSION
EOF
}

# Function to display command help
display_help() {
    cat << EOF
Usage: internsctl [OPTIONS] [ARGUMENTS]

OPTIONS
    --help          Display this help message
    --version       Display command version
    cpu getinfo      Display CPU information
    memory getinfo   Display memory information
    user create <username>  Create a new user
    user list [--sudo-only]  List all users or users with sudo permissions

EXAMPLES
    internsctl --help
    internsctl --version
    internsctl cpu getinfo
    internsctl memory getinfo
    internsctl user create john_doe
    internsctl user list
    internsctl user list --sudo-only
EOF
}

get_cpu_info() {
    lscpu
}

get_memory_info() {
    free -h
}

create_user() {
    if [ -z "$1" ]; then
        echo "Error: Missing username. Usage: internsctl user create <username>"
        exit 1
    fi

    username="$1"

    # Check if the user already exists
    if id "$username" &>/dev/null; then
        echo "Error: User '$username' already exists."
        exit 1
    fi

    # Create the user with a home directory
    useradd -m -s /bin/bash "$username"

    echo "User '$username' created successfully."
}

list_users() {
    if [ "$1" == "--sudo-only" ]; then
        getent group sudo | cut -d: -f4 | tr ',' '\n'
    else
        getent passwd | cut -d: -f1
    fi
}

# Main script logic
case "$1" in
    --help)
        display_help
        ;;
    --version)
        echo "internsctl $VERSION"
        ;;
    cpu)
        case "$2" in
            getinfo)
                get_cpu_info
                ;;
            *)
                echo "Error: Unknown subcommand. Use 'internsctl cpu getinfo' for CPU information."
                exit 1
                ;;
        esac
        ;;
    memory)
        case "$2" in
            getinfo)
                get_memory_info
                ;;
            *)
                echo "Error: Unknown subcommand. Use 'internsctl memory getinfo' for memory information."
                exit 1
                ;;
        esac
        ;;
    user)
        case "$2" in
            create)
                create_user "$3"
                ;;
            list)
                list_users "$4"
                ;;
            *)
                echo "Error: Unknown subcommand. Use 'internsctl user create <username>' to create a user, 'internsctl user list' to list all users, or 'internsctl user list --sudo-only' to list users with sudo permissions."
                exit 1
                ;;
        esac
        ;;
    *)
        echo "Error: Unknown command. Use 'internsctl user create <username>' to create a user."
        exit 1
        ;;
esac

# Create the manual page
display_manual > "$MANUAL_PATH/internsctl.1"

# Display the manual page
if [ "$1" = "man" ]; then
    man "$MANUAL_PATH/internsctl.1"
fi
