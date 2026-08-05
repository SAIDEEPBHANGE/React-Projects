function Task() {
  return (
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" />

        <label class="form-check-label">Complete Bootstrap tutorial</label>
      </div>

      <button class="btn btn-sm btn-outline-danger">Delete</button>
    </div>
  );
}
export default Task;
