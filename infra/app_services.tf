resource "azurerm_app_service_plan" "main" {
  name = "${local.name_prefix}-asp"
  location = local.location
  resource_group_name = azurerm_resource_group.main.name
  per_site_scaling = true
  sku {
    tier = var.tier
    size = var.size
  }
  tags = local.tags
}

resource "azurerm_app_service" "main" {
  name = "${local.name_prefix}-as"
  location = local.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id
  https_only = true
  
  app_settings = {    
    "ASPNETCORE_ENVIRONMENT" = var.env_long
    "WEBSITE_RUN_FROM_PACKAGE" = 1
    "REACT_APP_API_BASE_URL"= var.api_base_url
    "REACT_APP_AUTH_APP_URL"= var.app_auth_url
    "REACT_APP_AZURE_B2C_CLIENTID"= var.azure_b2c_client_id
    "REACT_APP_B2C_SIGNUP_SIGNIN_AUTHORITY_BASE"= var.azure_b2c_signup_signin_authority
    "REACT_APP_B2C_AUTHORITY_DOMAIN"= var.azure_b2c_authority_domain
    "REACT_APP_B2C_LOGIN_SCOPES"= var.azure_b2c_login_scopes 
  }

  tags = local.tags
}


resource "azurerm_app_service_slot" "main" {
  name = "staging"
  app_service_name = "${local.name_prefix}-as"
  location = local.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id
  https_only = true
  count = local.only_in_staging_and_production

    app_settings = {   
    "ASPNETCORE_ENVIRONMENT" = var.env_long
    "WEBSITE_RUN_FROM_PACKAGE" = 1
    "REACT_APP_API_BASE_URL"= var.api_base_url
    "REACT_APP_AUTH_APP_URL"= var.app_auth_url
    "REACT_APP_AZURE_B2C_CLIENTID"= var.azure_b2c_client_id
    "REACT_APP_B2C_SIGNUP_SIGNIN_AUTHORITY_BASE"= var.azure_b2c_signup_signin_authority
    "REACT_APP_B2C_AUTHORITY_DOMAIN"= var.azure_b2c_authority_domain
    "REACT_APP_B2C_LOGIN_SCOPES"= var.azure_b2c_login_scopes 
  }
  
  tags = local.tags
}