import { Context } from "telegraf";
import { fetchServices } from "../requests/requests.js";
import { createAction } from "../utils/actions.js";
import { actions } from "../consts/actions.js";
import { flowTypes } from "../consts/flow.js";
import { renderClickableList } from "../components/clickable-list.js";
export const servicesCtrl = async (ctx, actionParams) => {
  const [branchId, flowType, postId] = actionParams;
  const {
    data
  } = await fetchServices(ctx, branchId);
  const services = data.map(service => {
    let action = createAction(actions.selectService, flowType === flowTypes.sell ? [service._id, flowType] : [service._id, flowType, postId]);
    return {
      title: service.name,
      action
    };
  });
  return await renderClickableList(ctx, 'Please, choose services', services);
};