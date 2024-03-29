const path = require('path');
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'eslint-config-prettier',
    'prettier'
  ],
  plugins: ['prettier'],
  // setting: {
  //   react: {
  //     // Nói eslint-plugin-react tự động biết version của React.
  //     version: 'detect'
  //   },
  //   // Nói ESLint cách xử lý các import
  //   'import/resolver': {
  //     node: {
  //       paths: [path.resolve(__dirname)],
  //       extensions: ['.js', '.jsx', '.ts', '.tsx']
  //     },
  //     typescript: {
  //       project: path.resolve(__dirname, './tsconfig.json')
  //     }
  //   }
  // },
  env: {
    node: true
  },
  rules: {
    // Tắt rule yêu cầu import React trong file jsx
    'react/react-in-jsx-scope': 'off',
    // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
    'react/jsx-no-target-blank': 'warn',
    // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: true,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 100,
        jsxSingleQuote: true
      }
    ]
  }
};
