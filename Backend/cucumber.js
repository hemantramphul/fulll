module.exports = {
  default: {
    require: ["src/Tests/StepDefinitions.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    paths: ["src/Tests/features/*.feature"], // feature files
  },
};
