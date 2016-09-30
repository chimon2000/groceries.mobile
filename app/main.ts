import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { setStatusBarColors } from "./shared";

import { AppModule } from "./app.module";

setStatusBarColors()

platformNativeScriptDynamic().bootstrapModule(AppModule);
