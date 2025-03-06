module.exports = {
  default: {
    require: ["src/Tests/StepDefinitions.ts"], // step 1 definitions
    requireModule: ["ts-node/register"],
    format: ["progress"],
    paths: ["src/Tests/features/*.feature"], // all feature files
  },
};
