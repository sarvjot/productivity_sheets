[![Netlify Status](https://api.netlify.com/api/v1/badges/1993c4d7-0960-4f5f-aa6e-96c8d8d1af07/deploy-status)](https://app.netlify.com/sites/animated-stardust-bc1d3e/deploys)

# [What A Productive Day](https://www.whataproductiveday.study/)

1. This app asks two simple questions, "What do you want to do today?" and "What did you do today?". And based on your response, it generates your daily performance score. 
2. The idea for this app came from Ankur Warikoo's time management course, wherein he tells how he used to log all his activities in an Excel sheet and how it helped manage his time. 
3. Apart from daily performance score generation, the app has two more features:
    - **Records**: The user can query any date for his logs. It's my favorite feature, not only because it brings back the nostalgia, but because it helps analyze mistakes and relive successes. A glimpse of this is in the demo video.
    - **Analyze**: The user can analyze his monthly performance with a bar graph. By default, the app plots for the current month, but the user can query for any month. This feature is perfect for analyzing highs and lows.
4. **Performance Caluclation Formula**: $$perf = \frac{\sum perfTask_i * timeAllocatedTask_i}{\sum timeAllocatedTask_i}$$
5. Edge Cases:
    - If you log more than specified in the todo for some task-type, performance for it will be 100%
    - You cannot log after 23:59 for a particular day, because its no longer the same day now.
