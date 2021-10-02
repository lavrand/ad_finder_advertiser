import {Context} from "telegraf";
import {fetchServices, fetchUserServices} from "../requests/requests.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import {flowTypes} from "../consts/flow.js";
import {renderClickableList} from "../components/clickable-list.js";
import {ADD, REMOVE} from "../consts/req_actions.js";
import {_, getServiceTranslation} from "../utils/translator.js";
import {s} from "../../local-data/strings.js";

export const servicesCtrl = async (ctx: Context, actionParams: Array) => {
    const [branchId, flowType] = actionParams;

    let userServices;
    if (flowTypes.sell) userServices = await fetchUserServices(ctx);

    const {data} = await fetchServices(ctx, branchId);

    const services = data.map(service => {
        const toRemove = userServices && !!userServices.data?.find(s => s._id ? s._id === service._id : s === service._id)

        let action = createAction(
            actions.selectService,
            flowType === flowTypes.sell ? [service._id, flowType, toRemove ? REMOVE : ADD] : [service._id, flowType],
        );

        return {title: `${getServiceTranslation(service)} ${flowType === flowTypes.sell ? toRemove ? `(${_(s.add)})` : `(${_(s.delete)})` : ''}`, action};
    });
    return await renderClickableList(ctx, _(s.choose_service), services, 2);
}

