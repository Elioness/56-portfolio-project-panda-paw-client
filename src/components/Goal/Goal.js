import { useState } from "react";

//Feature 5.3 import useDispatch and the thunk action
import { useDispatch } from "react-redux";
import { updateGoal } from "../../store/user/actions";
import Loading from "../Loading";

export default function Goal() {
  const dispatch = useDispatch();

  const [newGoal, setNewGoal] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("What goes after click", newGoal);

    dispatch(updateGoal(newGoal));
  };

  if (!updateGoal) {
    return <Loading />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          Goal:{" "}
          <input value={newGoal} onChange={(e) => setNewGoal(e.target.value)} />
          <br />
        </p>

        <button type="submit">Submit new goal</button>
      </form>
    </div>
  );
}
