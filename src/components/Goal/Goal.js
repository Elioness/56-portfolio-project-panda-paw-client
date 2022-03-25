import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateGoal } from "../../store/user/actions";
import Loading from "../Loading";
import Button from "react-bootstrap/Button";

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

        <Button type="submit">Submit new goal</Button>
      </form>
    </div>
  );
}
