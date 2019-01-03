﻿using Localization.AspNetCore.Service.Factory;
using Localization.AspNetCore.Service.Manager;
using Localization.CoreLibrary.Database;
using Localization.CoreLibrary.Dictionary;
using Localization.CoreLibrary.Dictionary.Factory;
using Localization.CoreLibrary.Manager;
using Localization.CoreLibrary.Manager.Impl;
using Localization.CoreLibrary.Models;
using Localization.CoreLibrary.Resolver;
using Localization.CoreLibrary.Util;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace Localization.AspNetCore.Service.IoC
{
    public static class LocalizationServiceCollectionExtensions
    {
        public static void AddLocalizationService(
            this IServiceCollection services,
            IConfiguration configuration,
            string configurationKey
        )
        {
            services.Configure<LocalizationConfiguration>(configuration.GetSection(configurationKey));
            services.AddSingleton<ILocalizationConfiguration>(
                cfg => cfg.GetService<IOptions<LocalizationConfiguration>>().Value
            );

            services.AddSingleton<IStringLocalizerFactory, AttributeStringLocalizerFactory>();
            services.AddSingleton<RequestCultureManager>();

            services.AddTransient<ILocalization, LocalizationService>();
            services.AddTransient<IDictionary, DictionaryService>();
            services.AddTransient<IDynamicText, DynamicText>();

            services.AddTransient<IDictionaryFactory, JsonDictionaryFactory>();

            services.AddTransient<IFileLocalizationManager, FileLocalizationManager>();
            services.AddTransient<IFileDictionaryManager, FileDictionaryManager>();

            services.TryAddTransient<IDatabaseLocalizationManager, NullDatabaseLocalizationManager>();
            services.TryAddTransient<IDatabaseDictionaryManager, NullDatabaseDictionaryManager>();
            services.TryAddTransient<IDatabaseDynamicTextService, NullDatabaseDynamicTextService>();

            services.AddTransient<IAutoDictionaryManager, CoreLibrary.DictionaryManager>();
            services.AddTransient<IAutoLocalizationManager, CoreLibrary.LocalizationManager>();

            services.AddTransient<FallbackCultureResolver>();
        }
    }
}
