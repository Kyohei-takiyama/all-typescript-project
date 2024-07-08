variable "prefix" {
  type = string
}

variable "s3" {
  type = object({
    bucket_regional_domain_name = string
    bucket_id                   = string
  })
}

variable "domain_name" {
  type = string
}

variable "zone_id" {
  type = string
}
