import renderer from "react-test-renderer";

import ImageUploader from "../../components/image-uploader";

describe("<ImageUploader />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ImageUploader />).toJSON();
    expect(tree).toMatchSnapshot();;
   });
})