"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelClassVisitor = void 0;
const ts = require("typescript");
const decorators_1 = require("../../decorators");
const plugin_constants_1 = require("../plugin-constants");
const ast_utils_1 = require("../utils/ast-utils");
const plugin_utils_1 = require("../utils/plugin-utils");
const CLASS_DECORATORS = [
    decorators_1.ObjectType.name,
    decorators_1.InterfaceType.name,
    decorators_1.InputType.name,
    decorators_1.ArgsType.name,
];
class ModelClassVisitor {
    visit(sourceFile, ctx, program, pluginOptions) {
        this.importsToAdd = new Set();
        const typeChecker = program.getTypeChecker();
        const factory = ctx.factory;
        const visitNode = (node) => {
            const decorators = (0, ast_utils_1.getDecorators)(node);
            if (ts.isClassDeclaration(node) &&
                (0, ast_utils_1.hasDecorators)(decorators, CLASS_DECORATORS)) {
                const members = this.amendFieldsDecorators(factory, node.members, pluginOptions, sourceFile.fileName, typeChecker);
                const metadata = this.collectMetadataFromClassMembers(factory, members, pluginOptions, sourceFile.fileName, typeChecker);
                return this.updateClassDeclaration(factory, node, members, metadata, pluginOptions);
            }
            else if (ts.isSourceFile(node)) {
                const visitedNode = ts.visitEachChild(node, visitNode, ctx);
                const importStatements = this.createEagerImports(factory);
                const existingStatements = Array.from(visitedNode.statements);
                return factory.updateSourceFile(visitedNode, [
                    ...importStatements,
                    ...existingStatements,
                ]);
            }
            return ts.visitEachChild(node, visitNode, ctx);
        };
        return ts.visitNode(sourceFile, visitNode);
    }
    addDescriptionToClassDecorators(f, node) {
        const description = (0, ast_utils_1.getJSDocDescription)(node);
        const decorators = (0, ast_utils_1.getDecorators)(node);
        if (!description) {
            return decorators;
        }
        // get one of allowed decorators from list
        return decorators.map((decorator) => {
            if (!CLASS_DECORATORS.includes((0, ast_utils_1.getDecoratorName)(decorator))) {
                return decorator;
            }
            const decoratorExpression = decorator.expression;
            const objectLiteralExpression = (0, ast_utils_1.serializePrimitiveObjectToAst)(f, {
                description,
            });
            let newArgumentsArray = [];
            if (decoratorExpression.arguments.length === 0) {
                newArgumentsArray = [objectLiteralExpression];
            }
            else {
                // Options always a last parameter:
                // @ObjectType('name', {description: ''});
                // @ObjectType({description: ''});
                newArgumentsArray = decoratorExpression.arguments.map((argument, index) => {
                    if (index + 1 != decoratorExpression.arguments.length) {
                        return argument;
                    }
                    // merge existing props with new props
                    return (0, ast_utils_1.safelyMergeObjects)(f, objectLiteralExpression, argument);
                });
            }
            return f.updateDecorator(decorator, f.updateCallExpression(decoratorExpression, decoratorExpression.expression, decoratorExpression.typeArguments, newArgumentsArray));
        });
    }
    amendFieldsDecorators(f, members, pluginOptions, hostFilename, // sourceFile.fileName,
    typeChecker) {
        return members.map((member) => {
            const decorators = (0, ast_utils_1.getDecorators)(member);
            if ((ts.isPropertyDeclaration(member) || ts.isGetAccessor(member)) &&
                (0, ast_utils_1.hasDecorators)(decorators, [decorators_1.Field.name])) {
                try {
                    return (0, ast_utils_1.updateDecoratorArguments)(f, member, decorators_1.Field.name, (decoratorArguments) => {
                        const options = this.getOptionsFromFieldDecoratorOrUndefined(decoratorArguments);
                        const { type, ...metadata } = this.createFieldMetadata(f, member, typeChecker, hostFilename, pluginOptions, this.getTypeFromFieldDecoratorOrUndefined(decoratorArguments));
                        const serializedMetadata = (0, ast_utils_1.serializePrimitiveObjectToAst)(f, metadata);
                        return [
                            type,
                            options
                                ? (0, ast_utils_1.safelyMergeObjects)(f, serializedMetadata, options)
                                : serializedMetadata,
                        ];
                    });
                }
                catch (e) {
                    // omit error
                }
            }
            return member;
        });
    }
    collectMetadataFromClassMembers(f, members, pluginOptions, hostFilename, // sourceFile.fileName,
    typeChecker) {
        const properties = [];
        members.forEach((member) => {
            const decorators = (0, ast_utils_1.getDecorators)(member);
            const modifiers = (0, ast_utils_1.getModifiers)(member);
            if ((ts.isPropertyDeclaration(member) || ts.isGetAccessor(member)) &&
                !(0, ast_utils_1.hasModifiers)(modifiers, [
                    ts.SyntaxKind.StaticKeyword,
                    ts.SyntaxKind.PrivateKeyword,
                ]) &&
                !(0, ast_utils_1.hasDecorators)(decorators, [decorators_1.HideField.name, decorators_1.Field.name])) {
                try {
                    const metadata = this.createFieldMetadata(f, member, typeChecker, hostFilename, pluginOptions);
                    properties.push(f.createPropertyAssignment(f.createIdentifier(member.name.getText()), (0, ast_utils_1.serializePrimitiveObjectToAst)(f, metadata)));
                }
                catch (e) {
                    // omit error
                }
            }
        });
        return f.createObjectLiteralExpression(properties);
    }
    updateClassDeclaration(f, node, members, propsMetadata, pluginOptions) {
        const method = ast_utils_1.isInUpdatedAstContext
            ? f.createMethodDeclaration([f.createModifier(ts.SyntaxKind.StaticKeyword)], undefined, f.createIdentifier(plugin_constants_1.METADATA_FACTORY_NAME), undefined, undefined, [], undefined, f.createBlock([f.createReturnStatement(propsMetadata)], true))
            : f.createMethodDeclaration(undefined, [f.createModifier(ts.SyntaxKind.StaticKeyword)], undefined, f.createIdentifier(plugin_constants_1.METADATA_FACTORY_NAME), undefined, undefined, [], undefined, f.createBlock([f.createReturnStatement(propsMetadata)], true));
        const decorators = pluginOptions.introspectComments
            ? this.addDescriptionToClassDecorators(f, node)
            : (0, ast_utils_1.getDecorators)(node);
        return ast_utils_1.isInUpdatedAstContext
            ? f.updateClassDeclaration(node, [...decorators, ...(0, ast_utils_1.getModifiers)(node)], node.name, node.typeParameters, node.heritageClauses, [...members, method])
            : f.updateClassDeclaration(node, decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, [...members, method]);
    }
    getOptionsFromFieldDecoratorOrUndefined(decoratorArguments) {
        if (decoratorArguments.length > 1) {
            return decoratorArguments[1];
        }
        if (decoratorArguments.length === 1 &&
            !ts.isArrowFunction(decoratorArguments[0])) {
            return decoratorArguments[0];
        }
    }
    getTypeFromFieldDecoratorOrUndefined(decoratorArguments) {
        if (decoratorArguments.length > 0 &&
            ts.isArrowFunction(decoratorArguments[0])) {
            return decoratorArguments[0];
        }
    }
    createFieldMetadata(f, node, typeChecker, hostFilename = '', pluginOptions, typeArrowFunction) {
        const type = typeChecker.getTypeAtLocation(node);
        const isNullable = !!node.questionToken || (0, ast_utils_1.isNull)(type) || (0, ast_utils_1.isUndefined)(type);
        if (!typeArrowFunction) {
            typeArrowFunction =
                typeArrowFunction ||
                    f.createArrowFunction(undefined, undefined, [], undefined, undefined, this.getTypeUsingTypeChecker(f, node.type, typeChecker, hostFilename));
        }
        const description = pluginOptions.introspectComments
            ? (0, ast_utils_1.getJSDocDescription)(node)
            : undefined;
        const deprecationReason = pluginOptions.introspectComments
            ? (0, ast_utils_1.getJsDocDeprecation)(node)
            : undefined;
        return {
            nullable: isNullable || undefined,
            type: typeArrowFunction,
            description,
            deprecationReason,
        };
    }
    getTypeUsingTypeChecker(f, node, typeChecker, hostFilename) {
        if (node && ts.isUnionTypeNode(node)) {
            const nullableType = (0, ast_utils_1.findNullableTypeFromUnion)(node, typeChecker);
            const remainingTypes = node.types.filter((item) => item !== nullableType);
            if (remainingTypes.length === 1) {
                return this.getTypeUsingTypeChecker(f, remainingTypes[0], typeChecker, hostFilename);
            }
        }
        const type = typeChecker.getTypeAtLocation(node);
        if (!type) {
            return undefined;
        }
        const _typeReference = (0, plugin_utils_1.getTypeReferenceAsString)(type, typeChecker);
        if (!_typeReference) {
            return undefined;
        }
        const { typeReference, importPath } = (0, plugin_utils_1.replaceImportPath)(_typeReference, hostFilename);
        if (importPath) {
            // add top-level import to eagarly load class metadata
            this.importsToAdd.add(importPath);
        }
        return f.createIdentifier(typeReference);
    }
    createEagerImports(f) {
        if (!this.importsToAdd.size) {
            return [];
        }
        return Array.from(this.importsToAdd).map((path, index) => {
            return (0, ast_utils_1.createImportEquals)(f, 'eager_import_' + index, path);
        });
    }
}
exports.ModelClassVisitor = ModelClassVisitor;
