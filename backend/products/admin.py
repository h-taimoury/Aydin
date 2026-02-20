from django.contrib import admin
from django.db import models
from django import forms
from django.utils.html import format_html

from django_json_widget.widgets import JSONEditorWidget

from .models import Product, ProductImage

# If you're using Unfold:
from unfold.admin import ModelAdmin, TabularInline

# If you're NOT using Unfold, comment the line above and use:
# from django.contrib.admin import ModelAdmin, TabularInline


class ProductImageInlineFormSet(forms.BaseInlineFormSet):
    def clean(self):
        super().clean()
        primaries = 0
        for form in self.forms:
            if not hasattr(form, "cleaned_data"):
                continue
            if form.cleaned_data.get("DELETE", False):
                continue
            if form.cleaned_data.get("is_primary"):
                primaries += 1

        if primaries > 1:
            raise forms.ValidationError(
                "Only one image can be marked as primary per product."
            )


class ProductImageInline(TabularInline):
    model = ProductImage
    formset = ProductImageInlineFormSet
    extra = 1
    ordering = ("order", "id")

    # Thumbnail preview column
    readonly_fields = ("preview",)
    fields = ("preview", "image", "alt_text", "is_primary", "order")

    def preview(self, obj: ProductImage):
        if not obj or not getattr(obj, "image", None):
            return "—"
        try:
            return format_html(
                '<img src="{}" style="height:60px;width:60px;object-fit:cover;border-radius:8px;border:1px solid #ddd;" />',
                obj.image.url,
            )
        except Exception:
            return "—"

    preview.short_description = "Preview"


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ("name", "price")
    search_fields = ("name",)
    inlines = [ProductImageInline]

    # JSON editor for specifications
    formfield_overrides = {
        models.JSONField: {"widget": JSONEditorWidget},
    }
