import Checkbox from "@mui/material/Checkbox";
import {IPoolStrategies} from "../../../redux/interface/Setup/IStrategyOperations";
import {GridRenderCellParams} from "@mui/x-data-grid";

export const renderCheckbox = (
  poolStrategiesData: IPoolStrategies,
  handleSubmit: Function,
  params: GridRenderCellParams
) => (
  poolStrategiesData.strategyOperations && (
    <Checkbox
      onClick={() =>
        handleSubmit(
          poolStrategiesData.strategyOperations.find(
            (i) =>
              i.operation.id.toString() === params.field &&
              i.strategy.id === params.id
          )
        )
      }
      color={"success"}
      checked={
        poolStrategiesData.strategyOperations.find(
          (i) =>
            i.operation.id.toString() === params.field &&
            i.strategy.id === params.id
        )?.enabled
      }
    />
  )
)