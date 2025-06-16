import ApplicationError, { HTTPErrorParams } from '@common/errors';

export default class BadRequest extends ApplicationError {
  constructor(params?: HTTPErrorParams) {
    const { code, message, hint } = params || {};

    super({
      code: code || 'APP_E_BAD_REQUEST',
      message: message || 'Bad Request',
      hint: hint || null,
      status: 400,
    });
  }
}

export class ExampleCustomBadRequest extends BadRequest {
  constructor() {
    super({
      message: `Example custom bad request error`,
      code: 'BR_E_EXAMPLE_CUSTOM_BAD_REQUEST',
    });
  }
}
