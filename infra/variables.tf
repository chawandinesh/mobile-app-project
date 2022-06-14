locals {
  location_short    = "uks"
  location          = "UK South"
  website_time_zone = "GMT Standard Time"
  name_prefix       = "snap-${var.service_name}-${var.env_short}"
  tags = {
    "environment"       = var.env_long
    "platform"          = var.platform_name
    "service"           = var.service_name
    "terraform-managed" = true
  }

    only_in_production_mapping = {
    development = 0
    staging     = 0
    production  = 1
  }  
  
  only_in_production = "${local.only_in_production_mapping[var.env_long]}"

  only_in_staging_and_production_mapping = {
    development = 0
    staging     = 1
    production  = 1
  }  
  
  only_in_staging_and_production = "${local.only_in_staging_and_production_mapping[var.env_long]}"
}

variable "service_name" {
  description = "The name of the service"
  type        = string
}

variable "env_short" {
  description = "The short environment name"
  type        = string
}

variable "env_long" {
  description = "The long environment name"
  type        = string
}

variable "subscription_id" {
  description = "Azure subscription id"
  type        = string
}

variable "tier" {
  description = "The api tier"
  type        = string
}

variable "size" {
  description = "The api size"
  type        = string
}

variable "platform_name" {
  description = "The name of the Platform"
  type        = string
}

variable "tenant_id" {
  description = "Azure tenant id"
  type        = string
}

variable "client_id" {
  description = "Terraform client id"
  type        = string
}

variable "client_secret" {
  description = "Terraform app registration client secret"
  sensitive = true
  type        = string
}

variable "api_base_url" {
  description = "Ordering API url"
  type        = string
}

variable "app_auth_url" {
  description = "Auth app url"
  type        = string
}

variable "azure_b2c_client_id" {
  description = "Azure B2C Client Id"
  sensitive = true
  type        = string
}

variable "azure_b2c_signup_signin_authority" {
  description = "Azure B2c signup signin authority"
  type        = string
}

variable "azure_b2c_authority_domain" {
  description = "Azure B2c authority domain"
  type        = string
}

variable "azure_b2c_login_scopes" {
  description = "Azure B2c login scopes"
  type        = string
}