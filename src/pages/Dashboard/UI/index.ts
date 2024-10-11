import {ITradingPoolDetails} from "../../../redux/interface/Trading/ITrading";
import {Signals} from "../../../redux/interface/Trading/Signals";
import {Observer} from "@reduxjs/toolkit";
// import { IEventCandidate } from "../../../redux/interface/Crypto/ISignals";

// export function handleButton(itTrading: ITradingPoolDetails, event: any) {
//   const strArr = event.alias.split(".");
//
//   const res: { [key: string]: any[] } = {};
//
//   res["stable"] = itTrading.tokens.filter(
//     (it) => it.category.name.toLowerCase() === "stable"
//   );
//
//   for (const strArrElement of strArr) {
//     const nameKey = strArrElement.split('_', 2)[1]
//     res[nameKey] = itTrading.tokens.filter(
//       (it) => !it.category.name.localeCompare(nameKey, 'en', { sensitivity: "base" })
//     );
//   }
//
//
//   // for (let i = 0; i < strArr.length; i++) {
//   //  const arr = itTrading.tokens.filter(
//   //     (it) => it.category.name.toLowerCase() === strArr[i].split("_")[1]
//   //   );
//   //   res[strArr[i].split("_")[1]] = [...arr];
//   // }
//
//   const dataRes = {
//     alias: event.alias,
//     pool: itTrading.pool,
//     tokens: { ...res }
//   };
//
//
//   console.log(dataRes);
// }

export const handleButton = (
  itTrading: ITradingPoolDetails,
  event: any,
  handlerDialogModal: (res: any) => void
) => {
  let res = {poolId: itTrading.pool.id, key: event};
  handlerDialogModal(res);
};

export function checkColor(name: any): any {
  switch (name[0]) {
    case "buy":
      return "success";
    case "sell":
      return "error"
    // case Signals.BUY_LONG:
    //   return "success";
    // case Signals.SELL_LONG:
    //   return "error";
    // case Signals.BUY_SPOT:
    //   return "success";
    // case Signals.SELL_SPOT:
    //   return "error";
    // case Signals.BUY_SHORT:
    //   return "success";
    // case Signals.SELL_SHORT:
    //   return "error";
    default:
      return "info";
  }
}
