"""empty message

Revision ID: 91cb0b90ff0a
Revises: 19d1732553d2
Create Date: 2022-02-07 12:34:10.647091

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91cb0b90ff0a'
down_revision = '19d1732553d2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('image', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'image')
    # ### end Alembic commands ###
