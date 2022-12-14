import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsModule } from '@ngxs/store';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialUI } from './material-ui/material-ui.module';
import { ChatComponent } from './Modules/chat/chat.component';
import { AdventureComponent } from './Modules/general/adventure/adventure.component';
import { LoginComponent } from './Modules/login/login.component';
import { MainpageComponent } from './Modules/mainpage/mainpage.component';
import { AlchemyComponent } from './Modules/skills/alchemy/alchemy.component';
import { ConstructionComponent } from './Modules/skills/construction/construction.component';
import { CookingComponent } from './Modules/skills/cooking/cooking.component';
import { CraftingComponent } from './Modules/skills/crafting/crafting.component';
import { FiremakingComponent } from './Modules/skills/firemaking/firemaking.component';
import { FishingComponent } from './Modules/skills/fishing/fishing.component';
import { FletchingComponent } from './Modules/skills/fletching/fletching.component';
import { HerbloreComponent } from './Modules/skills/herblore/herblore.component';
import { MiningComponent } from './Modules/skills/mining/mining.component';
import { RunecraftingComponent } from './Modules/skills/runecrafting/runecrafting.component';
import { SmithingComponent } from './Modules/skills/smithing/smithing.component';
import { ThievingComponent } from './Modules/skills/thieving/thieving.component';
import { TreeSpotComponent } from './Modules/skills/woodcutting/tree-spot/tree-spot.component';
import { WoodcuttingComponent } from './Modules/skills/woodcutting/woodcutting.component';
import { CharacterState } from './stateManagement/character/character.state';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { BackpackComponent } from './Modules/backpack/backpack.component';
import { ThievingSpotComponent } from './Modules/skills/thieving/thieving-spot/thieving-spot.component';
import { TownComponent } from './Modules/town/town.component';
import { ShopItemComponent } from './Modules/town/shop-item/shop-item.component';
import { BuyingComponent } from './Modules/town/buying/buying.component';
import { MenuItemsComponent } from './Modules/mainpage/menu-items/menu-items.component';
import { InspectComponent } from './Modules/backpack/inspect/inspect.component';
import { SkillInformationComponent } from './Modules/general/skill-information/skill-information.component';
import { SkillRewardsComponent } from './Modules/general/skill-rewards/skill-rewards.component';
import { LockedComponent } from './Modules/general/locked/locked.component';
import { FishingSpotComponent } from './Modules/skills/fishing/fishing-spot/fishing-spot.component';
import { MiningSpotComponent } from './Modules/skills/mining/mining-spot/mining-spot.component';
import { AgilityComponent } from './Modules/skills/agility/agility.component';
import { AgilitySpotComponent } from './Modules/skills/agility/agility-spot/agility-spot.component';
import { SelectLogsComponent } from './Modules/skills/firemaking/select-logs/select-logs.component';
import { TimestampCountdownDirective } from './utils/timestamp-countdown.directive';
import { TimestampCountdownDirectiveProgress } from './utils/timestamp-countdown-progress.directive';
import { LeaderboardsComponent } from './Modules/leaderboards/leaderboards.component';
import { MatSortModule } from '@angular/material/sort';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
} };

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    WoodcuttingComponent,
    AlchemyComponent,
    AdventureComponent,
    TreeSpotComponent,
    AgilityComponent,
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
    ChatComponent,
    LoginComponent,
    TextInputComponent,
    BackpackComponent,
    ThievingSpotComponent,
    TownComponent,
    ShopItemComponent,
    BuyingComponent,
    MenuItemsComponent,
    InspectComponent,
    SkillInformationComponent,
    SkillRewardsComponent,
    LockedComponent,
    FishingSpotComponent,
    MiningSpotComponent,
    AgilitySpotComponent,
    SelectLogsComponent,
    TimestampCountdownDirective,
    TimestampCountdownDirectiveProgress,
    LeaderboardsComponent,
  ],
  imports: [
    BrowserModule,
    [NgxsModule.forRoot([CharacterState], {
      developmentMode: !environment.production
    }), NgxsStoragePluginModule.forRoot()],
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(config),
    MaterialUI,
    ReactiveFormsModule,
    MatSortModule,
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
