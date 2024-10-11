import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import MarketForm from "@UI/TradingForm/MarketForm";
import WinBoxV1 from "@UI/WinBox/WinBox";
import Dashboard from "../pages/Dashboard/Dashboard";
import Node from "../pages/Setup/Nodes/Node";
import Dapp from "../pages/Setup/Dapps/Dapp";
import Category from "../pages/Setup/Categories/Category";
import Pool from "../pages/Setup/Pools/Pool";
import Token from "../pages/Setup/Tokens/Token";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/PaletteTree">
        <PaletteTree />
      </ComponentPreview>
      <ComponentPreview path="/WinBoxV1">
        <WinBoxV1 />
      </ComponentPreview>
      <ComponentPreview path="/Dashboard">
        <Dashboard />
      </ComponentPreview>
      <ComponentPreview path="/Node">
        <Node />
      </ComponentPreview>
      <ComponentPreview path="/Dapp">
        <Dapp />
      </ComponentPreview>
      <ComponentPreview path="/Category">
        <Category />
      </ComponentPreview>
      <ComponentPreview path="/Pool">
        <Pool />
      </ComponentPreview>
      <ComponentPreview path="/Token">
        <Token />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;