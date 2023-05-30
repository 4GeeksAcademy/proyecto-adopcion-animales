"""empty message

Revision ID: b13d17f395de
Revises: c2bd36877801
Create Date: 2023-05-30 17:22:44.234000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b13d17f395de'
down_revision = 'c2bd36877801'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('asociacion', schema=None) as batch_op:
        batch_op.add_column(sa.Column('CIF', sa.String(length=80), nullable=False))
        batch_op.drop_column('NIF')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('asociacion', schema=None) as batch_op:
        batch_op.add_column(sa.Column('NIF', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
        batch_op.drop_column('CIF')

    # ### end Alembic commands ###