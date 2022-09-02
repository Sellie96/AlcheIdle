import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUI } from './material-ui/material-ui.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { WoodcuttingComponent } from './Modules/skills/woodcutting/woodcutting.component';
import { AlchemyComponent } from './Modules/skills/alchemy/alchemy.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { AdventureComponent } from './Modules/general/adventure/adventure.component';
import { TreeSpotComponent } from './Modules/skills/woodcutting/tree-spot/tree-spot.component';
import { FiremakingComponent } from './Modules/skills/firemaking/firemaking.component';
import { FishingComponent } from './Modules/skills/fishing/fishing.component';
import { CookingComponent } from './Modules/skills/cooking/cooking.component';
import { RunecraftingComponent } from './Modules/skills/runecrafting/runecrafting.component';
import { MiningComponent } from './Modules/skills/mining/mining.component';
import { SmithingComponent } from './Modules/skills/smithing/smithing.component';
import { ThievingComponent } from './Modules/skills/thieving/thieving.component';
import { FletchingComponent } from './Modules/skills/fletching/fletching.component';
import { CraftingComponent } from './Modules/skills/crafting/crafting.component';
import { HerbloreComponent } from './Modules/skills/herblore/herblore.component';
import { environment } from 'src/environments/environment';
import { CharacterState } from './stateManagement/character.state';
import { ConstructionComponent } from './Modules/skills/construction/construction.component';
import { LockedTreeComponent } from './Modules/skills/woodcutting/locked-tree/locked-tree.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    WoodcuttingComponent,
    AlchemyComponent,
    AdventureComponent,
    TreeSpotComponent,
    FiremakingComponent,
    FishingComponent,
    CookingComponent,
    RunecraftingComponent,
    MiningComponent,
    SmithingComponent,
    ThievingComponent,
    FletchingComponent,
    CraftingComponent,
    HerbloreComponent,
    ConstructionComponent,
    LockedTreeComponent
  ],
  imports: [
    BrowserModule,
    AngularToastifyModule,
    NgxsModule.forRoot([CharacterState], {
      developmentMode: !environment.production
    }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUI,
    GraphQLModule,
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
