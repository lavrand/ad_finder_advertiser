import { fetchBranches } from "../requests/requests.js";
import { createAction } from "../utils/actions.js";
import { actions } from "../consts/actions.js";
import { renderClickableList } from "../components/clickable-list.js";
import { Context } from "telegraf";
export const branchesCtrl = async (ctx, flowType) => {
  const {
    data
  } = await fetchBranches(ctx);
  const branches = data.map(b => ({
    title: b.name,
    action: createAction(actions.services, [b._id, flowType])
  }));
  return await renderClickableList(ctx, 'Choose branch', branches);
};