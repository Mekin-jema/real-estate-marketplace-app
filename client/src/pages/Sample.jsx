import React from "react";

const Sample = () => {
  return (
    <div>
      <h1>Sample</h1>
      <p>This is a sample paragraph.</p>
      <button onClick={() => alert("Button clicked!")}>Click Me</button>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sample;
