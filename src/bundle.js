import { pushInBundle, renderFirst } from "./bundles/create-pack";
import { cartPackSide } from "./bundles/open-side";
import { detectButtonsQuantity } from "./bundles/quantity-buttons";
import { clickPreviewModal, modaClosePrev } from "./preview-product/index-preview";

import './styles/preview-product.css'

renderFirst();
cartPackSide();
detectButtonsQuantity(pushInBundle);
clickPreviewModal();
modaClosePrev();