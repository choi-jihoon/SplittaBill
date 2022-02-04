from flask.cli import AppGroup
from .users import seed_users, undo_users
from .friends import seed_friends, undo_friends
from .bills import seed_bills, undo_bills

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_friends()
    seed_bills()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_friends()
    undo_bills()
    # Add other undo functions here
