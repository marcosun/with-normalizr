import { denormalize, normalize } from 'normalizr';

/**
 * By exposing normalise and denormalise methods to a schema,
 * you no longer need to import normalizr anywhere except where you define your schema.
 * How to use:
 * // In schema.js
 * const customerSchema = withRedux(new schema.Entity('customer'));
 *
 * Before:
 * // In some other files
 * import { normalize } from 'normalizr';
 * import { customerSchema } from './schema.js';
 * normalize({ id: 1, name: 'marco' }, customerSchema);
 * Now:
 * import { customerSchema } from './schema.js';
 * customerSchema.reduxNormalize({ id: 1, name: 'marco' })
 *
 * Before:
 * // In some other files
 * import { denormalize } from 'normalizr';
 * import { customerSchema } from './schema.js';
 * // state = customerSchema.reduxNormalize({ id: 1, name: 'marco' });
 * denormalize(state.result, customerSchema, state.entities);
 * Now:
 * import { customerSchema } from './schema.js';
 * customerSchema.reduxDenormalize(state);
 */
export default function withRedux(schema) {
  /* A wrapper function of denormalize. */
  schema.reduxDenormalize = (state, input = state.result) => {
    return denormalize(
      /**
       * Read input from state by default.
       * However, user may override this by providing input as the second parameter.
       */
      input,
      /* Schema has been defined already. */
      schema,
      /* Read entities from state. */
      state.entities,
    );
  };

  /* A wrapper function of normalize. */
  schema.reduxNormalize = (data) => {
    return normalize(data, schema);
  };

  return schema;
}
