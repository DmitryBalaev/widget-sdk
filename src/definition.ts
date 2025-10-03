import type { IGroupSettings, IPanelDescriptionCreator, TDeepPartial } from "./metaDescription";
import type { IWidgetPresetSettings } from "./preset";
import type { IWidgetMigrator, IWidgetStruct, TMigrationStruct } from "./migrates";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { StringKeyOf } from "./utilityTypes";
import type { IFillSettings } from "./widgetApi";
import type { IGlobalContext } from "./widgetContext";
import type { ITheme } from "./theme";

export interface IDefinition<
  WidgetSettings extends IBaseWidgetSettings,
  GroupSettings extends IGroupSettings,
  MigrationStruct extends TMigrationStruct = IWidgetStruct,
> {
  /** иконка виджета отображаемая в системе (в base64, svg или png) */
  icon?: string;

  /** возвращает конфигурацию настроек для отображения */
  createPanelDescription: IPanelDescriptionCreator<WidgetSettings, GroupSettings>;
  /** Используется для поддержания согласованности настроекю
   * Влияет на хранимую структуру настроек
   */
  fillSettings: IFillSettings<WidgetSettings>;
  /** получить начальные настройки виджета, используя заданный пользователем шаблон настроек */
  getInitialSettings?: (settings: Partial<IWidgetPresetSettings>) => Partial<IBaseWidgetSettings>;
  /** возвращает ключи показателей(разрезов или мер), для которых должна работать системная сортировка */
  getSortableIndicatorsKeys?(): Readonly<StringKeyOf<WidgetSettings>[]>;
  /** Регистрация системных миграторов виджета */
  registerSystemMigrateProcessors?(
    migrator: IWidgetMigrator<MigrationStruct>,
    globalContext: IGlobalContext
  ): void;
  /** Регистрация собственных миграторов виджета */
  registerLocalMigrateProcessors?(
    migrator: IWidgetMigrator<MigrationStruct>,
    globalContext: IGlobalContext
  ): void;
  /** Возвращает массив версий локальных миграций виджета */
  getLocalMigrateVersions(): string[];
  /** Предназначен для заполнения настроек значениями по умолчанию */
  resolveSettings?(
    rawSettings: TDeepPartial<WidgetSettings>,
    options: { theme: ITheme }
  ): WidgetSettings;
}
