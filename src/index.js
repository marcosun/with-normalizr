import { denormalize, normalize } from 'normalizr';

export default function withRedux(schema) {
  /* A wrapper function of denormalize. */
  schema.reduxDenormalize = (input, entities) => {
    let inputProp;
    let entitiesProp;

    if (entities === void 0) {
      /**
       * If only one argument is received, the received argument must be an object returned by
       * normalize function.
       */
      inputProp = input.result;
      entitiesProp = input.entities;
    } else {
      /**
       * If two arguments are received, they are input and entities defined by denormalize function.
       */
      inputProp = input;
      entitiesProp = entities;
    }

    return denormalize(
      inputProp,
      schema,
      entitiesProp,
    );
  };

  /* A wrapper function of normalize. */
  schema.reduxNormalize = (data) => {
    return normalize(data, schema);
  };

  return schema;
}
