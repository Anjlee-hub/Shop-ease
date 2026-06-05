import pandas as pd
import matplotlib.pyplot as plt

data=pd.read_csv('DailyDelhiClimateTest.csv')

plt.plot(data['meantemp'])
plt.title("trend")
plt.show()

plt.hist(data['meantemp'])
plt.title("distribution")
plt.show()