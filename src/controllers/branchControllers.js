import {fetchBranches} from "../requests/requests.js";
import {createAction} from "../utils/actions.js";
import {actions} from "../consts/actions.js";
import {renderClickableList} from "../components/clickable-list.js";
import {Context} from "telegraf";
import {_, getBranchTranslation} from "../utils/translator.js";
import {s} from "../../local-data/strings.js";


export const branchesCtrl = async (ctx: Context, flowType) => {
    const {data} = await fetchBranches(ctx);
    const branches = data.map(b => ({
        title: getBranchTranslation(b),
        action: createAction(actions.services, [b._id, flowType])
    }));
    return await renderClickableList(ctx, _(s.choose_branch), branches, 3);
}
