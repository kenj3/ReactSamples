module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "plugins": [
        "react"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "globalReturn": true,
            "impliedStrict": true,
            "experimentalObjectRestSpread": true,
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "settings": {
        "import/ignore": [
            "node_modules"
        ]
    },
    "globals": {
        "__uri": true,
        "__inline": true,
        "UE": true,
        "wx": true,
        "BMap": true
    },
    "rules": {
        "indent": [
            "warn", 
            4,
            {
                "SwitchCase": 1
            }
        ],
        "quotes": [1, "single"],
        "no-extra-semi": 1, 
        "semi": [1, "always"],
        
        "strict": 2,
        "no-console": 1,
        "no-case-declarations": 0,
        "no-undef": 2,
        "no-unused-vars": 1,
        "no-eval": 1,
        "valid-typeof": 2,
        "no-unreachable": 1,
        "no-dupe-args": 1,
        "no-dupe-keys": 1,
        "no-class-assign": 0,
        "jsx-quotes": 1,
        "no-control-regex": 0,
        "no-useless-escape": 0,
        
        "react/prefer-es6-class": [2, "always"],
        "react/jsx-pascal-case": 1,
        "react/jsx-closing-tag-location": 1,
        "react/jsx-curly-spacing": 1,
        "react/self-closing-comp": 1,
        "react/prop-types": 0,
        "react/display-name": 0,
        "react/require-render-return": 2,
        "react/jsx-no-target-blank": 0,
        "react/no-danger-with-children": 2,
        "react/no-string-refs": 2,
        "react/no-unknown-property": 2,
        "react/no-danger": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2
    }
};