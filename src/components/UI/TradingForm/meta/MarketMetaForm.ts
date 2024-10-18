import {ITypeEnums} from "../../../../types/ITypeEnums";
import {DirectionOfExchange} from "@UI/TradingForm/meta/IFormMeta";





export const MarketMetaForm: DirectionOfExchange = {
  tokenFrom: {
    fields: [
      {
        type: ITypeEnums.NUMBER,
        fieldName: 'payWithAmount',
        disabled: false,
        ladle: 'Pay with',
        validatorsProps: {
          required: "The field cannot be empty",
          min: 0.0000000000000002
        }
      },
      {
        type: ITypeEnums.BUTTON,
        fieldName: 'buttonAllAmount',
        disabled: false,
        ladle: 'Pay with',
        validatorsProps: {}
      },
      {
        type: ITypeEnums.SELECT,
        fieldName: 'tokenFrom',
        disabled: false,
        ladle: 'Select Token From',
        validatorsProps: {
          required: "The field cannot be selected"
        }
      },
      {
        type: ITypeEnums.SLIDER_ONE,
        fieldName: 'range',
        disabled: false,
        ladle: 'Select Token Range',
        validatorsProps: {

        }
      },
      {
        type: ITypeEnums.SLIDER_TWO,
        fieldName: 'defaultTxRange',
        disabled: false,
        ladle: 'Select Default Tx Range',
        validatorsProps: {

        }
      }
    ]
  },
  tokenTo: {
    fields: [
      {
        type: ITypeEnums.NUMBER,
        fieldName: 'estimatedAmount',
        disabled: false,
        ladle: 'Estimated',
        validatorsProps: {
          required: 'The field cannot be empty',
          min: 0.2
        }
      },
      {
        type: ITypeEnums.SELECT,
        fieldName: 'tokenTo',
        disabled: false,
        ladle: "Select Token To",
        validatorsProps: {
          required: "The field cannot be selected"
        }
      },
      {
        type: ITypeEnums.SELECT_SLIPPAGE,
        fieldName: 'slippage',
        disabled: false,
        ladle: "Select Slippage",
        validatorsProps: {
          required: "The field cannot be selected"
        }
      },
    ]
  }
}