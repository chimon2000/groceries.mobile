import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { setStatusBarColors } from "./utils";

import { AppModule } from "./app.module";

setStatusBarColors()

platformNativeScriptDynamic().bootstrapModule(AppModule);
