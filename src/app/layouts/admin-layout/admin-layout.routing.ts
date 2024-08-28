import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';

import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AuthguardGuard } from "../../services/authguard.guard";
import { AdminUsersComponent } from '../../admin-users/admin-users.component';
import { PlaylistComponent } from '../../playlist/playlist.component';
import { CardDetailsComponent } from '../../card-details/card-details.component';
import { VerificationComponent } from '../../verification/verification.component';
import { LoaderComponent } from '../../loader/loader.component';

import { PayoutComponent } from '../../payout/payout.component';
import { SearchComponent } from '../../search/search.component';
import { AdvertsComponent } from '../../adverts/adverts.component';
import { FileUploadsComponent } from '../../file-uploads/file-uploads.component';
import { MarketplaceComponent } from '../../marketplace/marketplace.component';

import { PlaylistDetailsComponent } from '../../playlist-details/playlist-details.component';
import { UserDetailsComponent } from '../../user-details/user-details.component';

import { CardsComponent } from '../../cards/cards.component';
import { TransactionsComponent } from '../../transactions/transactions.component';
import { VirtualTopupComponent } from '../../virtual-topup/virtual-topup.component';
import { RevenueRecordComponent } from '../../revenue-record/revenue-record.component';
import { RevenueListComponent } from '../../revenue-list/revenue-list.component';
import { KnowledgeBaseComponent } from '../../knowledge-base/knowledge-base.component';
import { CreateBlogComponent } from '../../create-blog/create-blog.component';
import { MasterWalletComponent } from '../../master-wallet/master-wallet.component';
import { HeadersComponent } from '../../headers/headers.component';
import { AddheadersComponent } from '../../addheaders/addheaders.component';
import { RecordCardComponent } from '../../record-card/record-card.component';
import { ShowDistributionComponent } from '../../show-distribution/show-distribution.component';
import { ShowListingDetailsComponent } from '../../show-listing-details/show-listing-details.component';
import { SupportComponent } from '../../support/support.component';
import { ShowStreamsComponent } from '../../show-streams/show-streams.component';
import { WithdrawalsComponent } from '../../withdrawals/withdrawals.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppusersComponent } from '../../appusers/appusers.component';
import { RevenueBatchComponent } from '../../revenue-batch/revenue-batch.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthguardGuard] },
    
    { path: 'table', component: TableComponent, canActivate: [AuthguardGuard] },
    { path: 'typography', component: TypographyComponent, canActivate: [AuthguardGuard] },
    { path: 'icons', component: IconsComponent, canActivate: [AuthguardGuard] },
    { path: 'maps', component: MapsComponent, canActivate: [AuthguardGuard] },
    { path: 'admin-users', component: AdminUsersComponent, canActivate: [AuthguardGuard] },
    // { path: 'verification', component: VerificationComponent, canActivate: [AuthguardGuard] },
    { path: 'playlist', component: PlaylistComponent, canActivate: [AuthguardGuard] },
    { path: 'card-details', component: CardDetailsComponent, canActivate: [AuthguardGuard] },
    { path: 'pay', component: PayoutComponent, canActivate: [AuthguardGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthguardGuard] },
    { path: 'adverts', component: AdvertsComponent, canActivate: [AuthguardGuard] },
    { path: 'fileuploads', component: FileUploadsComponent, canActivate: [AuthguardGuard] },
    { path: 'marketplace', component: MarketplaceComponent, canActivate: [AuthguardGuard] },
    { path: 'playlistdetails', component: PlaylistDetailsComponent, canActivate: [AuthguardGuard] },
    { path: 'userdetails', component: UserDetailsComponent, canActivate: [AuthguardGuard] },
    { path: 'cards', component: CardsComponent, canActivate: [AuthguardGuard] },
    { path: 'transactions', component: TransactionsComponent, canActivate: [AuthguardGuard] },
    { path: 'topup', component: VirtualTopupComponent, canActivate: [AuthguardGuard] },
    { path: 'revenue', component: RevenueRecordComponent, canActivate: [AuthguardGuard] },
    { path: 'revenue_list', component: RevenueListComponent, canActivate: [AuthguardGuard] },
    { path: 'knowledge-base', component: KnowledgeBaseComponent, canActivate: [AuthguardGuard] },
    { path: 'create-blog', component: CreateBlogComponent, canActivate: [AuthguardGuard] },
    { path: 'master-wallet', component: MasterWalletComponent, canActivate: [AuthguardGuard] },
    { path: 'headers', component: HeadersComponent, canActivate: [AuthguardGuard] },
    { path: 'add-headers', component: AddheadersComponent, canActivate: [AuthguardGuard] },
    { path: 'record-card', component: RecordCardComponent, canActivate: [AuthguardGuard] },
    { path: 'show-distribution', component: ShowDistributionComponent, canActivate: [AuthguardGuard] },
    { path: 'show-listings-details', component: ShowListingDetailsComponent, canActivate: [AuthguardGuard] },
    { path: 'support', component: SupportComponent, canActivate: [AuthguardGuard] },
    { path: 'show-streams', component: ShowStreamsComponent, canActivate: [AuthguardGuard] },
    { path: 'withdrawals', component: WithdrawalsComponent, canActivate: [AuthguardGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthguardGuard] },
    { path: 'users', component: AppusersComponent, canActivate: [AuthguardGuard] },
    { path: 'revenue_batch', component: RevenueBatchComponent, canActivate: [AuthguardGuard] },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    // { path: 'loader', component: LoaderComponent, canActivate: [AuthguardGuard] },
];
