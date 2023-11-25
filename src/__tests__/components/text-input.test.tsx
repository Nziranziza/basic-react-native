import renderer from "react-test-renderer";

import Input from "../../components/text-input";

describe("<Input />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();;
   });
})