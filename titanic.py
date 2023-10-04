import plotly
import plotly.graph_objects as go
import pandas as pd

titanic_df = pd.read_csv("https://raw.githubusercontent.com/plotly/datasets/master/titanic.csv")

# Create dimensions
class_dim = go.parcats.Dimension(
    values=titanic_df.Pclass,
    categoryorder='category ascending', label="Class"
)

gender_dim = go.parcats.Dimension(values=titanic_df.Sex, label="Gender")

survival_dim = go.parcats.Dimension(
    values=titanic_df.Survived, label="Outcome", categoryarray=[0, 1],
    ticktext=['perished', 'survived']
)

# Create parcats trace
color = titanic_df.Survived;
colorscale = [[0, 'lightsteelblue'], [1, 'mediumseagreen']];

fig = go.Figure(data = [go.Parcats(dimensions=[class_dim, gender_dim, survival_dim],
        line={'color': color, 'colorscale': colorscale},
        hoveron='color', hoverinfo='count+probability',
        labelfont={'size': 18, 'family': 'Times'},
        tickfont={'size': 16, 'family': 'Times'},
        arrangement='freeform')])

fig.show()
