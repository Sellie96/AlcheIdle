import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackpackComponent } from './Modules/backpack/backpack.component';

import { AdventureComponent } from './Modules/general/adventure/adventure.component';
import { MainpageComponent } from './Modules/mainpage/mainpage.component';
import { AgilityComponent } from './Modules/skills/agility/agility.component';
import { AlchemyComponent } from './Modules/skills/alchemy/alchemy.component';
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
import { WoodcuttingComponent } from './Modules/skills/woodcutting/woodcutting.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: MainpageComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'adventure', component: AdventureComponent },
      { path: 'alchemy', component: AlchemyComponent },
      { path: 'agility', component: AgilityComponent },
      { path: 'cooking', component: CookingComponent },
      { path: 'crafting', component: CraftingComponent },
      { path: 'firemaking', component: FiremakingComponent },
      { path: 'fishing', component: FishingComponent },
      { path: 'fletching', component: FletchingComponent },
      { path: 'herblore', component: HerbloreComponent },
      { path: 'mining', component: MiningComponent },
      { path: 'runecrafting', component: RunecraftingComponent },
      { path: 'smithing', component: SmithingComponent },
      { path: 'thieving', component: ThievingComponent },
      { path: 'woodcutting', component: WoodcuttingComponent },
      { path: 'backpack', component: BackpackComponent},
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
