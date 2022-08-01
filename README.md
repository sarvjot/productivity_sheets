# [What A Productive Day](https://www.whataproductiveday.study/)

## About

1. This app asks two simple questions, "What do you want to do today?" and "What did you do today?". And based on your response, it generates your daily performance score. 
2. The idea for this app came from Ankur Warikoo's time management course, wherein he tells how he used to log all his activities in an Excel sheet and how it helped manage his time. 
3. Apart from daily performance score generation, the app has two more features:
    - **Records**: The user can query any date for his logs. It's my favorite feature, not only because it brings back the nostalgia, but because it helps analyze mistakes and relive successes. A glimpse of this is in the demo video.
    - **Analyze**: The user can analyze his monthly performance with a bar graph. By default, the app plots for the current month, but the user can query for any month. This feature is perfect for analyzing highs and lows.
4. **Performance Caluclation Formula**: $$perf = \frac{\sum perfTask_i * timeAllocatedTask_i}{\sum timeAllocatedTask_i}$$
5. Edge Cases:
    - If you log more than specified in the todo for some task-type, performance for it will be 100%
    - You cannot log after 23:59 for a particular day, because its no longer the same day now.

## Journal potraying different stages of App's development

> Hosting on Github Pages with Custom Domain

1. Follow the [standard process](https://github.com/gitname/react-gh-pages) to host at github pages
2. Use [spa-github-pages script](https://github.com/rafgraph/spa-github-pages) to make [front-end routing](https://medium.com/@wilbo/server-side-vs-client-side-routing-71d710e9227f) magically work on github pages
3. Configure Custom domain utilising [this technique](https://stackoverflow.com/questions/44484377/hosting-gh-pages-on-custom-domain-white-empty-page/44484498#44484498), which I guess would make more sense when build folder would be hosted from backend

> Setting up AirBnb Linting with ESLint and Prettier for VSCode

1. [ESLint](https://eslint.org/docs/user-guide/getting-started): Let's us configure syntax styles and coding practices which leads to less buggy code
2. [Prettier](https://prettier.io/docs/en/index.html): Let's us configure white-space styling and others which leads to uniform structure of code
3. Linting Setup - Using only temrinal
    - We'll be using ESLint at the core, which will be having a Prettier plugin called [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier).
    - So we put all the ESLint config details in **.eslintrc** (including the prettier plugin mentioned in previous point).
    - However, the **eslint-plugin-prettier** also allows us to create a **.prettierrc** file, in which we can put custom prettier rules in addition to those which come with the plugin out of the box.
    - But there are some conflicting rules in ESLint and Prettier, so we will override the former's rules using a eslint config called [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier).
4. Using VSCode Extensions with above setup
    - Essentially the setup only needs ESLint Extension and not Prettier Extension
    - ESLint Extension follows the same rules defined in **.eslintrc** and **.prettierrc** to highlight the errors and warning in vscode editor
    - Extensions are helpful in finding errors live, while you're writing code
5. Installation from Scratch

    - Make sure you have **npm** and **npx** installed and **package.json** in root directory of your project
    - Install **eslint** and **prettier** npm packages
        ```
        npm install --save-dev eslint prettier
        ```
    - Install **airbnb** style config and peer dependencies
        ```
        npx install-peerdeps --dev eslint-config-airbnb
        ```
    - Install **prettier** plugin and config
        ```
        npm install --save-dev eslint-plugin-prettier eslint-config-prettier
        ```
    - Place the following scripts in your **package.json**
        ```json
        "lint": "npx eslint --ext .js --ext .jsx src",
        "lint:fix": "npm run lint -- --fix"
        ```
    - Copy configuration files from [.eslintrc](./.eslintrc) and [.prettierrc](./.prettierrc)

6. Usage
    - `npm run lint` : Check for errors in src directory
    - `npm run lint:fix` : Check and fix all errors in src directory

