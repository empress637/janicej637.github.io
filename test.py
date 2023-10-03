import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

%matplotlib inline
import plotly.express as px
fig = px.sunburst(df_m, path=['location', 'product',
                              'payment', 'gender', 'age'],
                  values='freq',
                  color='freq',
                  color_continuous_scale='rdbu_r',
                  width=960, height=600
                 )
fig.update_layout(margin = dict(t=0, l=0, r=0, b=0))
fig.show()
