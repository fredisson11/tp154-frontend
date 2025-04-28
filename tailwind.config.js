// eslint-disable-next-line @typescript-eslint/no-require-imports
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
})
