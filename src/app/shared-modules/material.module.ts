import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material';

const APP_MATERIAL_MODULES = [
    MatGridListModule,
];

@NgModule({
    declarations: [],
    imports: [ APP_MATERIAL_MODULES ],
    exports: [ APP_MATERIAL_MODULES ],
    providers: [],
})
export class MaterialModule {}